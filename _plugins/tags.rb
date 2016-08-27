# adapted from http://charliepark.org/tags-in-jekyll/
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"
      process(@name)
      read_yaml(File.join(base, "_layouts"), "tags.html")
      data['tag'] = tag
      data['title'] = "Posts Tagged &ldquo;#{tag}&rdquo;"
    end
  end

  class TagGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? "tags"
        site.tags.keys.each do |tag|
          write_tag_index(site, File.join("tag", Utils.slugify(tag)), tag)
        end
      end
    end

    def write_tag_index(site, dir, tag)
      index = TagIndex.new(site, site.source, dir, tag)
      index.render(site.layouts, site.site_payload)
      index.write(site.dest)
      site.pages << index
    end
  end
end
