import { FC } from 'react'

import { SmallPokemon } from '../../interfaces'
import { Card, CardBody, CardFooter, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ( { pokemon: { id, name, img } }) => {

    const router = useRouter();

    const onClick = () => {
        router.push(`/name/${name}`)
    }

  return (
		<Card key={id} isHoverable isPressable onClick={onClick}>
			<CardBody className="grid place-content-center">
				<Image
                    src={img ?? "ruta"}
                    alt="imagen Pokemon"
                    // width={140}
                    className="max-w-40 max-h-40"
                />
			</CardBody>
			<CardFooter className="grid place-content-center">
				<div className="font-bold">
					<span>#{id} -&nbsp;</span>
					<span className="text-transform: capitalize">{name}</span>
				</div>
			</CardFooter>
		</Card>
	);
}
