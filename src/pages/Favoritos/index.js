import { Link, json } from 'react-router-dom';
import './favoritos.css'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
function Favoritos() {
    const [filmes, setFilmes] = useState([])

    useEffect(() => {
        const minhaLista = localStorage.getItem('@prime')
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id) {
        let filtro = filmes.filter((item) => {
            return (
                (item.id !== id)
            )
        })
        setFilmes(filtro)
        localStorage.setItem("@prime", JSON.stringify(filtro))
        toast.success('filme deletado com sucesso!')
    }
    return (
        <div className='meus-favoritos'>
            <h1>
                Meus Filmes
            </h1>
            {
                filmes.length === 0 &&
                <span>
                    Você não possui filmes salvos!
                </span>
            }
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>
                                {item.title}
                            </span>
                            <div>
                                <Link to={`/filme/${item.id}`}>
                                    Ver detalhes
                                </Link>
                                <button onClick={() => excluirFilme(item.id)}>
                                    Excluir
                                </button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Favoritos;