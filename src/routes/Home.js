/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";

const Home = () => {
    const [Hwitter, setHwitter] = useState("")
    const [Hwitters, setHwitters] = useState([]);
    const getHwitters = async () => {
        const dbHwitters = await dbService.collection("hwitters").get();
        dbHwitters.forEach((document) => {
            const HwitterObject = {...document.data(), id: document.id,};
            setHwitters((prev) => [HwitterObject, ...prev]);
        });
    };
    useEffect(() => {
        getHwitters();
    }, [])

    const onSubmit = async event => {
        event.preventDefault();
       await dbService.collection("hwitters").add({
            Hwitter,
            createdAt: Date.now()
        });
        setHwitter("");
    }
    const onChange = event => {
        const {target : { value }} = event;
        setHwitter(value);
    }
    console.log(Hwitters);
    return(
        <>
        <form onSubmit= {onSubmit}>
            <input type = "text" placeholder = "what is your mind?" onChange={onChange} maxLength={240} value ={Hwitter}/>
            <input type = "submit" value ="Post"/>
        </form>
        <div>
            {Hwitters.map((Hwitter) => (<div  key = {Hwitter.id}>
                <h4>{Hwitter.Hwitter}</h4>
            </div>))}
        </div>
        </>
    )
}
export default Home;