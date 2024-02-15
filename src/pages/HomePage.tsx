import { CharacteristicList, Hero, SiteLayout, Support } from '../components'


export const HomePage = () => {

    return (
        <SiteLayout>
            <main>
                <Hero />
                <CharacteristicList />
                <Support />
            </main>
        </SiteLayout>
    )
}
