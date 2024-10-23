
const contact_list = [
    {
        target: "github",
        src: "https://github.com/Bian-Mu"
    },
    {
        target: "email",
        src: "bianmu.sky@gamil.com"
    },
    {
        target: "telegram",
        src: "https://t.me/Jiang_Yang"
    }
]
function SelfIntro() {
    return (
        <div className="self-intro">
            <div id="avatar">
                {/* <Image />
                <Text /> */}
            </div>
            <div id="contact">
                <ul id="contact-list">
                    {contact_list.map((item, index) => {
                        return <li key={index}><a href={item.src}>{item.target}</a></li>
                    })}
                </ul>
            </div>
            <hr />
            <p id="description">
                aaaaaaaaaaaaaaaaaaaaaaa
            </p>
        </div>
    )
}


export default SelfIntro