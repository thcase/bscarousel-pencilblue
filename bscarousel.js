/**
 * Copyright (C) 2015 Thomas H Case
 * This code is licensed under MIT license (see the LICENSE file for details)
 */
module.exports = function BSCarouselModule(pb) {
    
    //pb dependencies
    var util = pb.util;
    
    /**
     * @private
     * @static
     * @readonly
     * @property GALLERY_OBJ_TYPE
     */
    var GALLERY_OBJ_TYPE = 'bscarousel_gallery';

    /**
     *
     * @private
     * @static
     * @readonly
     * @property FIELD_TYPE_TEXT
     */
    var FIELD_TYPE_TEXT = Object.freeze({
        field_type: 'text'
    });
    
    /**
     *
     * @private
     * @static
     * @readonly
     * @property FIELD_TYPE_WYSIWYG
     */
    var FIELD_TYPE_WYSIWYG = Object.freeze({
        field_type: 'wysiwyg'
    });
    
    /**
     *
     * @private
     * @static
     * @readonly
     * @property FIELD_TYPE_BOOLEAN
     */
    var FIELD_TYPE_BOOLEAN = Object.freeze({
        field_type: 'boolean'
    });
    
    /**
     * BSCarousel -- Bootstrap Image Carousel
     * 
     * @author Thomas H. Case <thomas@thcase.com>
     * @copyright 2015 Thomas H. Case
     */
    function BSCarousel(){}

    /**
     * Called when the application is being installed for the first time.
     *
     * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
     * The result should be TRUE on success and FALSE on failure
     */
    BSCarousel.onInstall = function(cb) {
        var cos = new pb.CustomObjectService();
        
        this.setupGalleriesType = function() {
            cos.loadTypeByName(GALLERY_OBJ_TYPE, function(err, galleryType) {
                if (galleryType) {
                    return cb(null, true);
                }
                
                var galleryValues = {
                    name: GALLERY_OBJ_TYPE,
                    fields: {
                        name: FIELD_TYPE_TEXT,
                        description: FIELD_TYPE_WYSIWYG,
                        showGallery: FIELD_TYPE_BOOLEAN,
                        images: {
                            field_type: 'child_objects',
                            object_type: 'media'
                        }
                    }
                }
                
                cos.saveType(galleryValues, function(err, galleryType) {
                    cb(null, true);
                });
            });
        };
        
        this.setupGalleriesType();
    };

    /**
     * Called when the application is uninstalling this plugin.  The plugin should
     * make every effort to clean up any plugin-specific DB items or any in function
     * overrides it makes.
     *
     * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
     * The result should be TRUE on success and FALSE on failure
     */
    BSCarousel.onUninstall = function(cb) {
         cb(null, true);
    };

    /**
     * Called when the application is starting up. The function is also called at
     * the end of a successful install. It is guaranteed that all core PB services
     * will be available including access to the core DB.
     *
     * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
     * The result should be TRUE on success and FALSE on failure
     */
    BSCarousel.onStartup = function(cb) {
        cb(null, true);
    };

    /**
     * Called when the application is gracefully shutting down.  No guarantees are
     * provided for how much time will be provided the plugin to shut down.
     *
     * @param cb A callback that must be called upon completion.  cb(Error, Boolean).
     * The result should be TRUE on success and FALSE on failure
     */
    BSCarousel.onShutdown = function(cb) {
        cb(null, true);
    };

    //exports
    return BSCarousel;
};
