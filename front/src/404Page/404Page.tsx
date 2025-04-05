import { Link } from "react-router-dom";

const Etc = () =>{
    const styleContainer = {
        width:"100%",
        maxWidth:"330px",
        padding:"15px",
        margin: "10% auto"
    }
    return (<>
<div style={styleContainer} className="border border-2 rounded-3 bg-secondary-subtle">
    <div className="text-center">
        <img className="rounded border border-1" src="/default/avatar.jpeg" alt={"avatar.jpeg"} height={"75px"} width={"75px"}/>
        <h3 >404 - page not found </h3>
    </div>
    <Link className="btn btn-outline-primary w-100" to={{pathname:"/"}}>Go home</Link>
</div>
    </>)
}

export default Etc;