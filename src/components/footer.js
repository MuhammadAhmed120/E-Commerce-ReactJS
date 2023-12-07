export default function Footer() {
    return (

        <footer className="footer">
            <div className="container">
                <div className="footer_inner">
                    <div className="c-footer">
                        <div className="layout">
                            <div className="layout_item w-50">
                                <div className="newsletter">
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
                            </div>
                            <div className="layout_item w-25">
                                <ul className="flex">
                                    <li>
                                        <a href="https://www.linkedin.com/in/muhammad-ahmed-550ab0288/" target='_blank'>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 30 30">
                                                <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/MuhammadAhmed120" target='_blank'>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 30 30">
                                                <path d="M25.111 12.8v-.923h-1.752l-.77-.013c-.658 0-1.108.433-1.285.937v-.923h-1.962v5.988h1.962v-1.284-1.988c0-.597.484-1.081 1.081-1.081h.765v4.352h1.962v-1.284-1.988c0-.597.484-1.081 1.081-1.081h.974v-1.636l-.77-.013C25.738 11.863 25.288 12.297 25.111 12.8zM11.152 12.002L10.099 15.463 9.047 12.002 7.085 12.002 9.216 17.99 9.331 17.99 10.868 17.99 10.983 17.99 13.113 12.002zM3.136 12.002v-.399c0-.35.283-.633.633-.633h1.238V9.328H3.307c-1.177 0-2.132.954-2.132 2.132v.543H.028v1.587h1.147v4.4h1.962v-4.4h1.871v4.4H6.97v-4.4-1.587H5.008 3.136zM15.833 11.921h-.239c-1.607 0-2.91 1.303-2.91 2.91v.329c0 1.607 1.303 2.91 2.91 2.91h.531c1.1 0 2.042-.679 2.429-1.641l-1.73-.505c0 0-.207.593-.929.593-.815 0-1.246-.446-1.303-.952h0v-.003c-.004-.037-.006-.074-.006-.111h2.213 1.946v-.619C18.743 13.224 17.44 11.921 15.833 11.921zM14.587 14.296c.024-.538.467-.968 1.011-.968h.187c.544 0 .987.429 1.011.968H14.587zM28.754 15.689c-.674 0-1.22.546-1.22 1.22 0 .674.546 1.22 1.22 1.22.674 0 1.22-.546 1.22-1.22C29.974 16.235 29.428 15.689 28.754 15.689z"></path>
                                            </svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://github.com/MuhammadAhmed120" target='_blank'>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 30 30">
                                                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
                                            </svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="footer_copyright">
                    <p>&copy; 2023 STORE, Made by <a href="https://www.fiverr.com/editsbyahmed" target="_blank">Muhammad Ahmed</a></p>
                </div>
            </div>
        </footer >
    )

}