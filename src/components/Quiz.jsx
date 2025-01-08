import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";

const Quiz = ()=>{
    const [arr , setArr] = useState([])
    const [cnt , setCnt] = useState(0);
    const [disPlayScore , setDisplayScore] = useState(false);
    const [score , setScore] = useState(0)
    console.log(arr[cnt]);
    const reset = ()=>{
        setDisplayScore(!disPlayScore)
        setCnt(0);
    }
    const changeQue = ()=>{
        if(cnt === 9){
            setDisplayScore(!disPlayScore)
            return;
        }
        setCnt(cnt + 1);
    }
    const rightAns = ()=>{
        if(cnt === 9){
            setDisplayScore(!disPlayScore)
            return;
        }
        setCnt(cnt + 1)
        setScore(score + 1);
    }
    console.log(score);
    
    
    useEffect(() => {
        const apiFetch = async () => {
          try {
            const data = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple');
            const res = await data.json();
            setArr(res.results);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
        const timeoutId = setTimeout(() => {
            apiFetch();
        }, 2000);
        return () => clearTimeout(timeoutId);
      }, []);
      if(disPlayScore){
        return(
            <div className="flex justify-center items-center flex-col gap-4">
                <h1 className="text-4xl">Total-Score : {score}</h1>
                <button onClick={reset} className=" text-white bg-blue-700 px-4 py-1 rounded-md ">Restart</button>
            </div>
        )
      }
      if(!arr.length) return <Loader />
    return(
        <div className="flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-center">Quiz App</h1>
            <div className="flex flex-col gap-4 ">
                <h2 className="text-xl font-bold">Question {cnt + 1}</h2>
                { arr.length && <p>{arr[cnt].question}</p>}
                {arr.length && <ol className="px-12 flex flex-col gap-4 list-disc ">
                    {arr[cnt].incorrect_answers.map((ele , idx)=> <li onClick={changeQue} key={idx} className="bg-gray-400 w-fit px-2 py-1 rounded-md font-bold">{ele}</li>)}
                    <li onClick={rightAns} className="bg-gray-400 w-fit px-2 py-1 rounded-md font-bold">{arr[cnt].correct_answer}</li>
                </ol>}
                <button onClick={changeQue} className="bg-black w-fit text-white px-2 py-1 rounded-md font-bold ">Skip Question</button>
            </div>
        </div>
    )
}

export default Quiz;