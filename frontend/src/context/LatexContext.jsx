import React, { createContext, useState } from 'react'
import { useParams } from 'react-router-dom';
import API from '../api';

const LatexContext = createContext();

export const LatexProvider = ({children}) => {
    const [code, setCode] = useState("");
    const [compiling, setCompiling] = useState(false);
    const {id} = useParams();

    const compile = async () => {
        setCompiling(true);
        if (code === "") {
            console.log("Empty code field")
            return;
        }
        try {
            const resp = await API.post("api/")
        }
    }
  return (
    <div>LatexContext</div>
  )
}
