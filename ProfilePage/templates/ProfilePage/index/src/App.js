import React from 'react';
import TopNav from "./component/TopNav/TopNav";
import UserInfo from "./component/UserInfo/user_info";
import TemplateFetcher from "./component/UrlTemplate/template_fetcher";

function App() {
    return (
        <div>
            <header>
                <TopNav/>
                <UserInfo/>
            </header>
            <section>
                <TemplateFetcher/>
            </section>
        </div>
    );
}

export default App;
