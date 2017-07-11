<navbar class="navbar" id="app-navbar">
    <div class="container">
        <div class="navbar-brand">
            <a href="/" class="navbar-item">
                <img src="/logo/ts-logo-96.png" alt="Logo" class="logo-img"/>
                <span class="logo-text"><b>Tree</b><span style="font-weight: 300">Snap</span></span>
            </a>
            <div class="navbar-burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>


        <div class="navbar-menu">
            <div class="navbar-end">
                <a href="/" class="navbar-item">
                    Home
                </a>

                <a href="/map" class="navbar-item">
                    Map
                </a>

                <a href="/about" class="navbar-item">
                    About
                </a>

                @if(auth()->check())
                    <a href="/account" class="navbar-item">
                        Account
                    </a>

                    @if(auth()->user()->isAdmin())
                        <a href="/admin" class="navbar-item">
                            Admin
                        </a>
                    @endif

                    <a href="/logout" class="navbar-item">
                        Logout
                    </a>
                @else
                    <a href="/login" class="navbar-item">
                        Login
                    </a>

                    <a href="/register" class="navbar-item">
                        Register
                    </a>
                @endif
            </div>
        </div>
    </div>
</navbar>