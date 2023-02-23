import { MainTop } from "./MainTop/MainTop";
import { MainBottom } from "./MainBottom/MainBottom";

export const Main = () => {
    return (
        <main className="main">
            <MainTop />
            <MainBottom />
        </main>
    );
}