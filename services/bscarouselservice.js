/**
 * Copyright (C) 2015 Thomas H Case
 * This code is licensed under MIT license (see the LICENSE file for details)
 */
module.exports = function(pb) {
	
	//pb dependencies
    var util              = pb.util;
    var BaseObjectService = pb.BaseObjectService;
	
	/**
	  * BSCarouselService constructor
	 **/
	function BSCarouselService() {};
	
	/**
	 * Init function required by PencilBlue
	 **/ 
	BSCarouselService.init = function(cb) {
		 pb.log.debug("BSCarouselService: Initialized");
		 cb(null,true);
	}
	 
	 
	BSCarouselService.getName = function() {
        return "bsCarouselService";
    };
	/**
	 * Return service
	 */
	return BSCarouselService;
};