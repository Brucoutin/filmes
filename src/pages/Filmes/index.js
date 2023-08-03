import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { toast } from 'react-toastify';
import './filmes.css';
function Filmes() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadMovie() {
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: "b29367ad6a0686bae8c94c10ca792da6",
                    language: "pt-BR"
                }
            }).then((response) => {
                setFilme(response.data)
                setLoading(false)
            })
                .catch(() => {
                    navigate('/', {replace:true})
                    return
                })
        }
        loadMovie();

        return () => {
            console.log("Componente desmontado")
        }
    }, [navigate, id])

    if (loading) {
        return (
            <div className="filme-info">
                <h1>
                    Carregando detalhe...
                </h1>
            </div>
        )
    }
    function salvarFilme (){
        const minhalista = localStorage.getItem("@prime")
        let filmeSalvo = JSON.parse(minhalista) || []
        const filmes = filmeSalvo.some((moviesave)=> moviesave.id === filme.id )
        if(filmes){
        toast.warn('esse filme já está na lista!')
            return
        }
        filmeSalvo.push(filme)
        localStorage.setItem("@prime", JSON.stringify(filmeSalvo))

        toast.success("Filme salvo com sucesso!")
    }
    
    return (
        <div className="filme-info">
            <h1>
                {filme.title}
            </h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>
                Sipnose
            </h3>
            <span>
                {filme.overview}
            </span>
            <strong>
                Avaliação: 
                {filme.vote_average}/10
            </strong>
            <div className="button">
                <button onClick={salvarFilme}>
                    Salvar
                </button>
                <button>
                    <a target="blank" rel='external' href={`https://www.youtube.com/results?search_query=${filme.title} trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}
export default Filmes;