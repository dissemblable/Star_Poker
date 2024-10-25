import { useEffect, useState } from "react"
import {repeatIn } from "./verification"


const Poker = () => {
    const [jeuxDeCarte, setjeuxDeCarte] = useState([7,7,7,7,8,8,8,8,9,9,9,9,10,10,10,10,11,11,11,11,12,12,12,12,13,13,13,13,14,14,14,14])
    const [mainOrdi, setMainOrdi] = useState<number[]>([])
    const [mainJoueur, setMainJoueur] = useState<number[]>([])
    const [victoire, setVictoire] = useState<boolean>(false)
    const [defaite, setDefaite] = useState<boolean>(false)
    const [gameStart, setGameStart] = useState<boolean>(false)
    let index = 3

    const getRandomInt = (max : number) => {
        return Math.floor(Math.random() * max);
    }

    const compareNumbers = (a : number, b : number) => {
        return a - b;
    }

    const pick = () => {
        let sub : number[] = []
        for(let i=0; i<4; i++){
            const taille : number = jeuxDeCarte.length
            let nbrAleatoir : number = getRandomInt(taille)
            let valeur : number = jeuxDeCarte[nbrAleatoir]
            setjeuxDeCarte(jeuxDeCarte.splice(nbrAleatoir, 1))
            sub.push(valeur)
            sub.sort(compareNumbers)
        }
        return sub
    }

    
    const isCarre = () => {
        if(repeatIn(mainJoueur, 4) === true){
            if(repeatIn(mainOrdi, 4) === true){
                verifValeurHaut()
            }else{
                setVictoire(true)
            }
        }else if(repeatIn(mainOrdi, 4) === true){
            setDefaite(true)
        }else{
            isBrelan()
        }
    }

    const isBrelan = () => {
        if(repeatIn(mainJoueur, 3) === true){
            if(repeatIn(mainOrdi, 3) === true){
                if(mainJoueur[2] > mainOrdi[2]){
                    setVictoire(true)
                }else{
                    setDefaite(true)
                }
            }else{
                setVictoire(true)
            }
        }else if(repeatIn(mainOrdi, 3) === true){
            setDefaite(true)
        }else{
            isPaire()
        }
    }

    const isPaire = () => {
        if(repeatIn(mainJoueur, 2) === true){
            if(repeatIn(mainOrdi, 2) === true){
                if(findPairValue(mainJoueur) > findPairValue(mainOrdi)){
                    setVictoire(true)
                }else{
                    setDefaite(true)
                }
            }else{
                setVictoire(true)
            }
        }else if(repeatIn(mainOrdi, 2) === true){
            setDefaite(true)
        }else{
            verifValeurHaut()
        }
    }

    const verifValeurHaut = () => {
        if(mainJoueur[index] > mainOrdi[index]){
            setVictoire(true)
        }else if(mainJoueur[index] === mainOrdi[index]){
            index--
            verifValeurHaut()
        }else{
            setDefaite(true)
        }
    }

    const findPairValue = (arr: number[]) => {
        const countMap: { [key: number]: number } = {};
      
        for (const num of arr) {
          countMap[num] = (countMap[num] || 0) + 1;
        }
        for (const num in countMap) {
          if (countMap[num] === 2) {
            return parseInt(num);
          }
        }
        return 0
    }

    const verifMain = () => {
        isCarre()

    }

    const handleSubmit = () => {
        setGameStart(true)
        setMainJoueur(pick())
        setMainOrdi(pick())

    }
    
    useEffect(() => {
        if (gameStart === true){
            verifMain()
        }

        if(victoire === true){
            alert("vous avez gagner")
        }else if(defaite === true){
            alert("vous avez perdu")
        }

    }, [gameStart, victoire, defaite])
    

    return (
    <div className="flex justify-center pt-16">
        <div className=" flex-row p-16">
            <div>
                {mainOrdi.map((res, index) => (
                    <span className="border-2 border-black" key={index}>ordinnateur : {res} </span>
                ))}
            </div>
            <div>
                {mainJoueur.map((res, index) => (
                    <span className="border-2 border-black" key={index}>Joueur : {res} </span>
                ))}
            </div>
        </div>
        <div>
            <button onClick={handleSubmit}>Start</button>
        </div>
    </div>
)
}

export default Poker