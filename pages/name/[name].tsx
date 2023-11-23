import { useState } from "react";

import { useRouter } from "next/router"
import { GetStaticProps, GetStaticPaths, GetStaticPathsContext, NextPage } from "next";

import { Card, CardBody, Image, CardFooter, CardHeader, Button } from "@nextui-org/react";

import { Layout } from "../../components/layouts";
import { pokeApi } from "../../api";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
import { log } from "console";

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id))


    const onTogleFavorite = () => {
        // console.log('ID:', pokemon.id );
        // localStorage.setItem('favorites', `${pokemon.id}`)
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites);
    }



    return (
        <Layout title={pokemon.name}>
            <div className='grid grid-cols-6 gap-4'>
                <Card
                    isHoverable
                >
                    <CardBody>
                        <Image
                            src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                            alt={ pokemon.name}
                            width="100%"
                            height={ 200 }
                        />
                    </CardBody>
                </Card>
                <Card className="col-span-2">
                    <CardHeader className="flex justify-between">
                        <h1 className="text-3xl font-bold mb-4 capitalize">{pokemon.name}</h1>
                        <Button color="primary" variant={isInFavorites?  "solid": "ghost"} onClick={ onTogleFavorite }>
                            {isInFavorites ? 'Favorito' : 'Guardar en Favoritos'}
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <div className="text-2xl">Sprites:</div>

                        <div className="flex flex-row">
                            <Image
                                src={ pokemon.sprites.front_default }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                            <Image
                                src={ pokemon.sprites.back_default }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                            <Image
                                src={ pokemon.sprites.front_shiny }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                            <Image
                                src={ pokemon.sprites.back_shiny }
                                alt={ pokemon.name }
                                width={ 100 }
                                height={ 100 }
                            />
                        </div>
                    </CardBody>
                </Card>
            </div>
        </ Layout>
    )

}

export const getStaticPaths: GetStaticPaths = async (ctx: GetStaticPathsContext): Promise<{ paths: { params: { name: string }; }[]; fallback: false; }> => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
    const results = data.results;

    // console.log(data.results[0]);


    // const pokemon151 = [...Array(151)].map( ( value, index ) => `${ index+1  }`)
    // console.log(pokemon151);


    return {
        paths: results.map( ({ name }) => ( {
              params: {name}
        })),
        fallback: false,
    }

}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name:string}

    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export default PokemonByNamePage;