/**
 * Boostrap Carousel Plugin for PencilBlue BSCarousel Service
 * @copyright Thomas H Case 2015 
 * @author Thomas H Case
 * @license This code is licensed under MIT license (see the LICENSE file for details)
 */
module.exports = function(pb) {
	
	//pb dependencies
    var util    = pb.util;
    var cos 	= new pb.CustomObjectService();
 
	
	/**
     * BSCarouselService - An example of a service that leverages the 
     * CustomObjectService to perform the CRUD operations.
     * @class BSCarouselService
     * @constructor
     */
	function BSCarouselService() {
	}
	
	/**
     * The name of the Custom Object Type
     * @private
     * @static
     * @readonly
     * @property TYPE
     * @type {String}
     */
    var CUSTOM_OBJ_TYPENAME = 'bscarousel_gallery';
    
    /**
     * The name the service
     * @private
     * @static
     * @readonly
     * @property SERVICE_NAME
     * @type {String}
     */
    var SERVICE_NAME = 'BSCarouselService'; 
	
	/**
	 * Init function required by PencilBlue
	 **/ 
	BSCarouselService.init = function(cb) {
		 pb.log.debug(SERVICE_NAME + ": Initialized");
		 cb(null,true);
	}
	 
	 
	/**
     * A service interface function designed to allow developers to name the handle 
     * to the service object what ever they desire. The function must return a 
     * valid string and must not conflict with the names of other services for the 
     * plugin that the service is associated with.
     *
     * @static
     * @method getName
     * @return {String} The service name
     */
	BSCarouselService.getName = function() {
        return SERVICE_NAME;
    };
    
    /**
	 * Retrieves All Gallery Items 
	 * @method getAll
	 * @return array of gallery item documents
	 */
	BSCarouselService.getAll = function(options,cb) {
        var self = this;
        if (util.isFunction(options)) {
            cb      = options;
            options = {};
        } else if (!util.isObject(options)) {
            options = {};
        }
        self.getType(function(err,objType){
            if(err){
                cb(err,null);
            }
            cos.findByType(objType,options,function(err,result){
               if(err) {
                   cb(err,null);
               } 
               pb.log.debug('Found [%s] gallery items',result.length);
               cb(null,result);
            });
        });
 	}
    
    /**
     * Retrieves actual Object Type from CustomObjectService
     * @method getType
     * @param {function} cb
     */
    BSCarouselService.getType = function(cb) {
      cos.loadTypeByName(CUSTOM_OBJ_TYPENAME,function(err,customObject){
	      if(err){
		      cb(err,null);
	      }
	      var objectType = customObject.type;
	      cb(null,objectType);
      });
    }
    
	/**
	 * Retrieves a Gallery Item by Id
	 * @method getAllShowGallery
	 * @return array of gallery item documents
	 */
	BSCarouselService.getById = function(id,options,cb) {
		if (util.isFunction(options)) {
            cb      = options;
            options = {};
        } else if (!util.isObject(options)) {
            options = {};
        }
        cos.loadById(id,options,cb);
	}
    
    /**
     * Retrieves Media URL
     * @method getMediaUrl
     * @param id
     * @param {Function} cb
     */
    BSCarouselService.getMediaUrl = function(id,cb){
        var self = this;
        self.getMedia(id,function(err,media){
            if(util.isError(err)) {
               cb(err,null);
           } 
           cb(null,media.location);
        });
    }
    
    /**
     * Retrieves Media Object
     * @method getMedia
     * @param id
     * @param {Function} cb
     */
    BSCarouselService.getMedia = function(id,cb) {
        var mediaService = new pb.MediaService();
        mediaService.loadById(id,function(err,media){
           if(util.isError(err)) {
               cb(err,null);
           } 
           cb(null,media);
        });
    }
    
	/**
	 * Return service
	 */
	return BSCarouselService;
};