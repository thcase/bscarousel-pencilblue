/**
 * Boostrap Carousel Plugin for PencilBlue BSCarousel Controller
 * @copyright Thomas H Case 2015 
 * @author Thomas H Case
 * @license This code is licensed under MIT license (see the LICENSE file for details)
 */
module.exports = function(pb) {

  //Node dependencies
  var async = require('async');

  //PB dependencies
  var util            = pb.util;
  var config          = pb.config;
  var PluginService   = pb.PluginService;
  var CarouselService = PluginService.getService('BSCarouselService','bscarousel-pencilblue');
  var TopMenu         = pb.TopMenuService;
  var pluginService = new PluginService();
  
  // Instantiate the controller & extend the base controller
  function BSCarouselController(){};
  util.inherits(BSCarouselController, pb.BaseController);

  /**
   * Renders a Index page 
   * @method renderPage
   * @param {Function} cb
   */
  BSCarouselController.prototype.renderIndexPage = function(cb) {
    var self = this;
    var content =  {
        content_type: "text/html",
        code: 200
    }
    
    self.gatherData(function(err,data){
      if(util.isError(err)) {
        cb(err,null)
      }
      pluginService.getSettings('bscarousel-pencilblue', function(err,settings) {
        if(util.isError(err)){
          cb(err,null)
        }
        self.registerLocalVariables(settings,data.nav);
        // Get Galleries and display
        self.ts.registerLocal('bscarousel_galleries',function(flag,cb){
            var tasks = util.getTasks(data.content,function(content,i){
              return function(callback){
                self.renderGalleryItem(content[i],i,callback);
              };
            });
            async.parallel(tasks,function(err,results){
              cb(err,new pb.TemplateValue(results.join(''),false));
            });
        });
        self.ts.load('bscarousel_galleries',function(err,template) {
          if(util.isError(err)) {
              content.content = '';
          }
          else {
              content.content = template;
          }
          cb(content);
        });
      });
    });
  };

  /**
   * Renders Gallery Page
   * @method renderGalleryPage
   * @param {Function} cb
   */
  BSCarouselController.prototype.renderGalleryPage = function(cb){
    var self = this;
    var content =  {
        content_type: "text/html",
        code: 200
    }
    self.gatherData(function(err,data){
      if(util.isError(err)) {
        cb(err,null)
      }
      pluginService.getSettings('bscarousel-pencilblue', function(err,settings) {
        if(util.isError(err)){
          cb(err,null)
        }
        self.registerLocalVariables(settings,data.nav);
        self.ts.registerLocal('bscarousel_name',data.content[0].name);
        //Display Gallery
        self.ts.registerLocal('bscarousel_indicators',function(flag,cb){
          var countImages = data.content[0].images.length;
          var indicators = '';
          for(var i = 0; i < countImages; i++){
            if(i == 0) {
              indicators += '<li data-target="#myCarousel" data-slide-to="'+ i + '" class="active">';
            } else {
              indicators += '<li data-target="#myCarousel" data-slide-to="'+ i + '">';
            }
          }
          cb(null,new pb.TemplateValue(indicators,false));
        });
        self.ts.registerLocal('bscarousel_items',function(flag,cb){
          var images = data.content[0].images;
          var tasks = util.getTasks(images,function(image,i){
            return function(callback) {
              self.renderGalleryImage(image[i],i,callback);
            }
          })
          async.parallel(tasks,function(err,results){
            cb(err,new pb.TemplateValue(results.join(''),false));
          });
        });
        self.ts.load('bscarousel_view',function(err,template){
          if(util.isError(err)) {
              content.content = '';
          }
          else {
              content.content = template;
          }
          cb(content);
        });
      });
    });
  };
  
  /**
   * Registers Template items
   * @param {function}cb A callback function in form of cb(Error,Boolean)
   */
  BSCarouselController.prototype.registerLocalVariables = function(settings,nav) {
    var self = this;
    var pageKeywords = '';
    var pageDescription = '';
    var stylesheetInclude = '';
    // Set page variables from Plug-in Settings
    for(var i = 0; i < settings.length; i++) {
        switch(settings[i].name) {
            case 'index_page_keywords':
                pageKeywords = settings[i].value;
                break;
            case 'index_page_description':
                pageDescription = settings[i].value;
                break;
            case 'gallery_stylesheet':
                stylesheetInclude = settings[i].value;
            default:
                break;
        }
    }
    // Register Page Settings with Template Service
    self.ts.registerLocal('bscarousel_stylesheet',stylesheetInclude);
    self.ts.registerLocal('meta_keywords', pageKeywords);
    self.ts.registerLocal('meta_desc', pageDescription);
    self.ts.registerLocal('meta_title', pb.config.siteName);
    self.ts.registerLocal('meta_lang', config.localization.defaultLocale);
    self.ts.registerLocal('current_url', self.req.url);
    self.ts.registerLocal('navigation', new pb.TemplateValue(nav.navigation, false));
    self.ts.registerLocal('account_buttons', new pb.TemplateValue(nav.accountButtons, false));
  };
  
  /**
   * Renders Gallery Item
   * @method renderGalleryItem
   * @param {Object} item
   * @param index
   * @param {Function} cb
   */
  BSCarouselController.prototype.renderGalleryItem = function(item,index,cb){ 
    var self = this;
    var ats = new pb.TemplateService(self.ls);
    ats.registerLocal('gallery_item_id',item._id);
    ats.registerLocal('gallery_item_name',item.name)
    if(item.galleryImage) {
      ats.registerLocal('gallery_item_image_url', function(flag,cb){
        CarouselService.getMediaUrl(item.galleryImage,function(err,url){
          cb(null,url);
        })
      });
    }
    ats.load('bscarousel_galleryitem',function(err,template){
      if(util.isError(err)) {
        cb(err,'');
      } else {
        cb(null,template);
      }
    })
  };
  
  /**
   * Renderer for individual Gallery Image in a Carousel
   * @param imageId the Id of a media object
   * @param index The index for the image object
   * @param {function}cb A callback function to pass back the template
   */
  BSCarouselController.prototype.renderGalleryImage = function(imageId,index,cb) {
    var self = this;
    
    CarouselService.getMedia(imageId,function(err,media){
      if(util.isError(err)){
        cb(err,null);
      }
      var ats = new pb.TemplateService(self.ls);
      var activeClass = '';
      if(index == 0) {
        activeClass = 'active';
      } 
      ats.registerLocal('bscarousel_item_active',activeClass);
      ats.registerLocal('bscarousel_item_location',media.location);
      ats.registerLocal('bscarousel_item_name',media.name);
      if(!media.caption) {
        media.caption = '';
      }
      ats.registerLocal('bscarousel_item_caption',media.caption)
      ats.load('bscarousel_galleryimage',function(err,template){
        if(util.isError(err)){
          cb(err,'');
        } else {
          cb(null,template);
        }
      });
    });
  };
  
  /**
   * Gathers Data for page
   * @method gatherData
   * @param {Function} cb
   */
  BSCarouselController.prototype.gatherData = function(cb) {
    var self = this;
    var tasks = {
      //navigation
      nav: function(callback) {
        self.getNavigation(function(themeSettings,navigation,accountButtons){
          callback(null,{themesettings:themeSettings, navigation:navigation, accountButtons:accountButtons});
        });
      },
      //content
      content: function(callback){
        self.loadContent(callback);
      }
    };
    async.parallel(tasks,cb);
  };
  
  /**
   * Loads Page Content
   * @method loadContent
   * @param {Function} cb
   */
  BSCarouselController.prototype.loadContent = function (galleryCallback) {
    var options = {};
    var vars = this.pathvars;
    if(vars != undefined && vars.id != undefined) {
      CarouselService.getById(vars.id,options,galleryCallback);
    } else {
      options.where = {"showGallery":{$eq:true}};
      CarouselService.getAll(options,galleryCallback);
    }
  };
  
  /**
   * Retrieves Navigation
   */
  BSCarouselController.prototype.getNavigation = function(cb) {
      var options = {
          currUrl: "/gallery/"
      }
      TopMenu.getTopMenu(this.session, this.ls, options, function(themeSettings, navigation, accountButtons) {
          TopMenu.getBootstrapNav(navigation, accountButtons, function(navigation, accountButtons) {
              cb(themeSettings, navigation, accountButtons);
          });
      });
  };
  
  /**
   * Define the routes for the controller
   * @static
   * @method getRoutes
   * @param {Function} cb Takes two parameters.  The first an Error, if 
   * occurred, and an array of objects describing the resources managed 
   * by this controller
   */
  BSCarouselController.getRoutes = function(cb) {
    var routes = [{
      method: 'get',
      path: "/gallery/:id",
      auth_required: false,
      handler: 'renderGalleryPage',
      content_type: 'text/html'
    },{
      method: 'get',
      path: "/gallery/",
      auth_required: false,
      handler:'renderIndexPage',
      content_type: 'text/html'
    }];
    cb(null, routes);
  };

  // return the controller prototype so it can be loaded into the application
  return BSCarouselController;
};