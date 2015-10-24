# bscarousel-pencilblue
PencilBlue Plugin that uses Bootstrap Carousel to display image galleries.  The plugin's controller uses the /galleries and /galleries/:id routes.

##Installation and Setup
1. Clone the bscarousel-pencilblue repository into the plugins folder of your PencilBlue installation
```
cd [pencilblue_directory]/plugins
git clone https://github.com/thcase/bscarousel-pencilblue.git
```
2. Install the bscarousel-pencilblue plugin through the manage plugins screen in the admin section (/admin/plugins).
3. Go to the bscarousel-pencilblue settings screen (/admin/plugins/settings/bscarousel-pencilblue) and set the index page keywords, description, and optionally, the stylesheet used for the gallery.  The stylesheet is provided in the `[pencilblue_directory]/plugins/bscarousel-pencilblue/public/css` directory.  If you want your own styles, copy the default.css to your own theme's public/css directory, rename, and override the styles provided.
4. To add a navigation item to go to the Navigation page in the Content area of the admin section (/admin/content/navigation). Add a Link to '/galleries'.
5. To add a gallery go to the bscarousel_gallery objects in the Custom Objects page in the Content area in the admin section (/admin/content/objects).
6. The images used for a gallery come from the media library and need to be added prior to creating the gallery.  You can add images on the Media Page in the Content area in the Admin section (/admin/content/media).  The gallery uses the image name and caption from the media item.
