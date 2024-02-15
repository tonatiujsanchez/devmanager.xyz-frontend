import { CharacteristicList, Hero, SiteLayout, Support } from '../components'


export const HomePage = () => {
    return (
        <SiteLayout>
            <Hero />
            <CharacteristicList />
            <Support />
        </SiteLayout>
    )
}
