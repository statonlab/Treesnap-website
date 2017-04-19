class Http {
    constructor() {
        this.path = window.location.pathname
        if (this.path !== '/') {
            this.path.replace(/\/$/g, '')
        }
    }

    isActive(url, exact = true, className = 'is-active') {
        if (exact && this.path === url) {
            return className
        } else if (!exact && this.path.indexOf(url) >= 0) {
            return className
        } else {
            return null
        }
    }
}

export default new Http()