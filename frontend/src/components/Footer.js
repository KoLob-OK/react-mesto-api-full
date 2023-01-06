function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer page__footer">
            <p className="footer__copyright">
                &copy;&nbsp;{currentYear <= 2022 ? "2022" : `${currentYear}`}{" "}Created by KolobOK
            </p>
        </footer>
    );
}

export default Footer;