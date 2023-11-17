function PropDrilling() {
    const [profile, setProfile] = useState({ ame: 'John' });
    return (
        <div> <Header profile={profile} />
        </div>
    );
}

function Header({ profile }) {
    return (
        <header>
            <h1>This is the header</h1>
            <Content profile={profile} />
        </header>
    );
}

function Content({ profile }) {
    return (
        <main>
            <h2>Content Component</h2>
            <p>{profile.name}</p>
        </main>
    );
}

export default PropDrilling;