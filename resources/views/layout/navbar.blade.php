<nav class="nav">
    <div class="container">
        <div class="nav-left nav-brand">
            <a href="/" class="nav-item">
                <img src="/logo/ts-logo-96.png" alt="Logo" class="logo-img"/>
                <span class="logo-text"><b>Tree</b><span style="font-weight: 300">snap</span></span>
            </a>
        </div>

        <div class="nav-toggle">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="nav-right nav-menu">
            <a href="/" class="nav-item">
                Home
            </a>

            <a href="/help" class="nav-item">
                Help
            </a>

            <a href="/about" class="nav-item">
                About
            </a>

            @if(auth()->check())
                <a href="/account" class="nav-item">
                    Account
                </a>

                @if(auth()->user()->isAdmin())
                    <a href="/admin" class="nav-item">
                        Admin
                    </a>
                @endif

                <a href="/logout" class="nav-item">
                    Logout
                </a>
            @else
                <a href="/login" class="nav-item">
                    Login
                </a>

                <a href="/register" class="nav-item">
                    Register
                </a>
            @endif
        </div>
    </div>
</nav>