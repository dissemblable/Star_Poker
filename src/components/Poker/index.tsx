import { useState } from "react"


const Poker = () => {
    const [jeuxDeCarte, setjeuxDeCarte] = useState(["7","7","7","7","8","8","8","8","9","9","9","9","10","10","10","10","V","V","V","V","D","D","D","D","R","R","R","R","1","1","1","1"])
    const [mainOrdi, setMainOrdi] = useState<string[]>([])
    const [mainJoueur, setMainJoueur] = useState<string[]>([])

    const getRandomInt = (max : number) => {
        return Math.floor(Math.random() * max);
    }

    const pick = () => {
        let sub : string[] = []
        for(let i=0; i<4; i++){
            const taille : number = jeuxDeCarte.length
            let nbrAleatoir : number = getRandomInt(taille)
            let valeur : string = jeuxDeCarte[nbrAleatoir]
            setjeuxDeCarte(jeuxDeCarte.splice(nbrAleatoir, 1))
            sub.push(valeur)
        }
        return sub
    }
    






    const handleSubmit = () => {
        setMainJoueur(pick())
        setMainOrdi(pick())

    }


    return (
    <div className="flex justify-center pt-16">
        <div className=" p-16">
            <span className="border-2 border-black">ordinnateur : {mainOrdi}</span>
            <span className="border-2 border-black">joueur : {mainJoueur}</span>
        </div>
        <div>
            <button onClick={handleSubmit}>Start</button>
        </div>
    </div>
)
}

export default Poker