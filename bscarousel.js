/**
 * Bootstrap Carousel PencilBlue Plugin Module
 * @author Thomas H Case
 * @copyright Thomas H Case 2015 
 * @license This code is licensed under MIT license (see the LICENSE file for details)
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
    var GALLERY_OBJ_TYPENAME = 'bscarousel_gallery';

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
        
        cos.loadTypeByName(GALLERY_OBJ_TYPENAME, function(err, galleryType) {
            // throw error back to cb if exists
            if(err) {
                cb(err,null);
            }
            // Define Custom Object
            var galleryObjectDefinition = {
                name: GALLERY_OBJ_TYPENAME,
                fields: {
                    name: FIELD_TYPE_TEXT,
                    description: FIELD_TYPE_WYSIWYG,
                    showGallery: FIELD_TYPE_BOOLEAN,
                    keywords: FIELD_TYPE_TEXT,
                    galleryImage: {
                        field_type: 'peer_object',
                        object_type: 'media'
                    },
                    images: {
                        field_type: 'child_objects',
                        object_type: 'media'
                    }
                }
            }
            // Save (create or update) Object
            cos.saveType(galleryObjectDefinition, function(err, galleryType) {
                cb(null, true);
            });
        });
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
        cb(null,true)  
    }
   
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
