from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import jwt
import datetime
from functools import wraps
import os

app = Flask(__name__)
# IMPORTANT:  Configure CORS properly for production!  This is just for development.
CORS(app, supports_credentials=True, origin="http://localhost:3000")  # Adjust origin as needed

# Change this to a strong, randomly generated secret in a real application!
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET', 'your-dev-secret-key')

# In-memory user database (replace with a real database in production)
users = {
    "testuser": {"id": 1, "password": "password123"},
    "admin": {"id": 2, "password": "adminpass"},
}

# --- Utility Functions ---

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.cookies.get('token') # Get token from cookie
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = users.get(data['username']) # Fetch user from 'database'

            if current_user is None:
                return jsonify({'message': 'Invalid token'}), 401

        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401
        except Exception as e:
             return jsonify({'message': 'Something went wrong', 'error': str(e)}), 500


        return f(current_user, *args, **kwargs)

    return decorated

def create_tokens(username):
    """Creates both access and refresh tokens."""
    access_token = jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=15) # Short lifetime
    }, app.config['SECRET_KEY'], algorithm="HS256")

    refresh_token = jwt.encode({
        'username': username,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=30)  # Longer lifetime
    }, app.config['SECRET_KEY'], algorithm="HS256")

    return access_token, refresh_token


# --- Routes ---

@app.route('/api/login', methods=['POST'])
def login():
    auth = request.get_json()

    if not auth or not auth.get('username') or not auth.get('password'):
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})

    user = users.get(auth.get('username'))
    if not user or user['password'] != auth.get('password'):
        return make_response('Could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'})


    access_token, refresh_token = create_tokens(auth.get('username'))

    # Set access token as httpOnly cookie
    resp = jsonify({'message': 'Successfully logged in!', 'user': {'id': user['id'], 'username': auth.get('username')}})
    resp.set_cookie('token', access_token, httponly=True, secure=False, samesite='Strict') # secure=True in production!
    resp.set_cookie('refresh_token', refresh_token, httponly=True, secure=False, samesite='Strict') # secure=True in production!

    return resp

@app.route('/api/logout', methods=['POST'])
def logout():
    resp = jsonify({'message': 'Successfully logged out!'})
    resp.set_cookie('token', '', expires=0, httponly=True, secure=False, samesite='Strict')
    resp.set_cookie('refresh_token', '', expires=0, httponly=True, secure=False, samesite='Strict')
    return resp

@app.route('/api/refresh-token', methods=['POST'])
def refresh_token():
    refresh_token = request.cookies.get('refresh_token')

    if not refresh_token:
        return jsonify({'message': 'Refresh token is missing'}), 401

    try:
        data = jwt.decode(refresh_token, app.config['SECRET_KEY'], algorithms=["HS256"])
        current_user = users.get(data['username']) # Fetch user from 'database'

        if current_user is None:
            return jsonify({'message': 'Invalid refresh token'}), 401


        access_token, new_refresh_token = create_tokens(data['username']) # issue new access and refresh

        resp = jsonify({'message': 'Access token refreshed'})
        resp.set_cookie('token', access_token, httponly=True, secure=False, samesite='Strict')
        resp.set_cookie('refresh_token', new_refresh_token, httponly=True, secure=False, samesite='Strict') # rotate the refresh token
        return resp

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Refresh token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid refresh token'}), 401
    except Exception as e:
         return jsonify({'message': 'Something went wrong', 'error': str(e)}), 500


@app.route('/api/protected-data')
@token_required
def protected_data(current_user):
    return jsonify({'message': f'This is protected data for user {current_user["username"]}', 'user_id': current_user["id"]})

@app.route('/api/check-auth')
@token_required
def check_auth(current_user):
    return jsonify({'message': 'User is authenticated', 'user': {'id': current_user["id"], 'username': current_user["username"]}})


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0") # Make sure to set debug=False in production!