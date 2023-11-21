export default function Footer() {
    return (

        <footer className="footer">
            <div className="container">
                <div className="footer_inner">
                    <div className="c-footer">
                        <div className="layout">
                            <div className="layout_item w-50">
                                <div className="newsletter">
                                    {/* <h3 style={{ color: 'black' }} className="newsletter_title">Get updates on fun stuff you probably want to know about in your inbox.</h3> */}
                                    <form action="">
                                        <input type="text" placeholder="Email Address" />
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="layout_item w-25">
                                <nav className="c-nav-tool">
                                    <h4 className="c-nav-tool_title">Menu</h4>
                                    <ul className="c-nav-tool_list">
                                        <li>
                                            <a href="/collections/all" className="c-link">Shop All</a>
                                        </li>

                                        <li>
                                            <a href="/pages/about-us" className="c-link">About Us</a>
                                        </li>

                                        <li>
                                            <a href="/blogs/community" className="c-link">Community</a>
                                        </li>
                                        <li>
                                            <a href="#" className="c-link">Vibes</a>
                                        </li>
                                    </ul>
                                </nav>

                            </div>

                            <div className="layout_item w-25">
                                <nav className="c-nav-tool">
                                    <h4 className="c-nav-tool_title">Support</h4>
                                    <ul className="c-nav-tool_list">

                                        <li className="c-nav-tool_item">
                                            <a href="/pages/shipping-returns" className="c-link">Shipping &amp; Returns</a>
                                        </li>

                                        <li className="c-nav-tool_item">
                                            <a href="/pages/help" className="c-link">Help &amp; FAQ</a>
                                        </li>

                                        <li className="c-nav-tool_item">
                                            <a href="/pages/terms-conditions" className="c-link">Terms &amp; Conditions</a>
                                        </li>

                                        <li className="c-nav-tool_item">
                                            <a href="/pages/privacy-policy" className="c-link">Privacy Policy</a>
                                        </li>

                                        <li className="c-nav-tool_item">
                                            <a href="/pages/contact" className="c-link">Contact</a>
                                        </li>

                                        <li className="c-nav-tool_item">
                                            <a href="/account/login" className="c-link">
                                                Login
                                            </a>
                                        </li>
                                    </ul>
                                </nav>

                            </div>
                        </div>
                        <div className="layout c-2">
                            <div className="layout_item w-50">
                                <ul className="flex">
                                    <li>

                                    </li>
                                    <li>

                                    </li>
                                    <li>

                                    </li>
                                    <li>

                                    </li>
                                    <li>

                                    </li>
                                </ul>
                            </div>
                            <div className="layout_item w-25">
                                <ul className="flex">
                                    <li>
                                        <a href="https://www.facebook.com/" target='_blank'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                                            </svg>
                                        </a>
                                    </li>
                                    {/* <li>
                                            <a href="#">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                                    <path fill="none" d="M0 0h24v24H0z" />
                                                    <path d="M22.162 5.656a8.384 8.384 0 0 1-2.402.658A4.196 4.196 0 0 0 21.6 4c-.82.488-1.719.83-2.656 1.015a4.182 4.182 0 0 0-7.126 3.814 11.874 11.874 0 0 1-8.62-4.37 4.168 4.168 0 0 0-.566 2.103c0 1.45.738 2.731 1.86 3.481a4.168 4.168 0 0 1-1.894-.523v.052a4.185 4.185 0 0 0 3.355 4.101 4.21 4.21 0 0 1-1.89.072A4.185 4.185 0 0 0 7.97 16.65a8.394 8.394 0 0 1-6.191 1.732 11.83 11.83 0 0 0 6.41 1.88c7.693 0 11.9-6.373 11.9-11.9 0-.18-.005-.362-.013-.54a8.496 8.496 0 0 0 2.087-2.165z" />
                                                </svg>
                                            </a>
                                        </li> */}
                                    <li>
                                        <a href="https://www.instagram.com/" target='_blank'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
                                                <path fill="none" d="M0 0h24v24H0z" />
                                                <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="layout_item w-25" style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                    onClick={() => {
                                        window.scrollTo({
                                            top: 0,
                                            behavior: 'smooth',
                                        });
                                    }}
                                    style={{ width: 36, height: 36, cursor: 'pointer' }}
                                >
                                    <path fill="none" d="M0 0h24v24H0z" />
                                    <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm1 10h3l-4-4-4 4h3v4h2v-4z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer_copyright">
                    <p>&copy; 2023 FLEXUS, Made by Muhammad Ahmed</p>
                </div>
            </div>
        </footer >
    )

}