module.exports = function BSCarouselModule(pb) {
	/**
     * BSCarousel - An image carousel for PencilBlue based on bootstrap carousel
     *
     * @author Thomas H Case <thomas@thcase.com>
     * @copyright 2015 Thomas H Case
     */
    function BSCarousel(){}
    /**
     * Called when the application is being installed for the first time.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    BSCarousel.onInstall = function(cb) {
        cb(null, true);
    };

    /**
     * Called when the application is uninstalling this plugin.  The plugin should
     * make every effort to clean up any plugin-specific DB items or any in function
     * overrides it makes.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    BSCarousel.onUninstall = function(cb) {
        cb(null, true);
    };

    /**
     * Called when the application is starting up. The function is also called at
     * the end of a successful install. It is guaranteed that all core PB services
     * will be available including access to the core DB.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    BSCarousel.onStartup = function(cb) {
        cb(null, true);
    };

    /**
     * Called when the application is gracefully shutting down.  No guarantees are
     * provided for how much time will be provided the plugin to shut down.
     *
     * @param cb A callback that must be called upon completion.  cb(err, result).
     * The result is ignored
     */
    BSCarousel.onShutdown = function(cb) {
        cb(null, true);
    };

    //exports
    return BSCarousel;
}