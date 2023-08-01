import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import './filmes.css';
function Filmes() {
    const { id } = useParams();
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
                    console.log('Filme não encontrado!')
                })
        }
        loadMovie();

        return () => {
            console.log("Componente desmontado")
        }
    }, [])

    if (loading) {
        return (
            <div className="filme-info">
                <h1>
                    Carregando detalhe...
                </h1>
            </div>
        )
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
                <button>
                    Salvar
                </button>
                <button>
                    <a href="#">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}
export default Filmes;