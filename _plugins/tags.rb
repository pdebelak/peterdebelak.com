# adapted from http://charliepark.org/tags-in-jekyll/
module Jekyll
  class TagIndex < Page
    def initialize(site, base, dir, tag)
      @site = site
      @base = base
      @dir = dir
      @name = "index.html"
      process(@name)
      read_yaml(File.join(base, "_layouts"), "#{site.config["tags"]["layout"]}.html")
      data["tag"] = tag
      data["title"] = regex_in_tag(site.config["tags"]["title"], tag)
      data["description"] = regex_in_tag(site.config["tags"]["description"], tag)
      data["display_title"] = regex_in_tag(site.config["tags"]["display_title"], tag)
    end

    private

    def regex_in_tag(string, tag)
      (string || "").gsub(/{{tag}}/, tag)
    end
  end

  class TagGenerator < Generator
    safe true

    def generate(site)
      if site.layouts.key? site.config["tags"]["layout"]
        site.tags.keys.each do |tag|
          write_tag_index(site, File.join(site.config["tags"]["layout"], Utils.slugify(tag)), tag)
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
