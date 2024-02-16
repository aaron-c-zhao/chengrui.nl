require 'json'

module SearchDataGeneratorPlugin
  class SearchDataGenerator < Jekyll::Generator
    priority :low

    def generate(site)
      posts = site.posts.docs.map do |post|
        {
          'title' => post.data['title'],
          'content' => "#{post.data['title']} #{post.content}",
          'url' => post.url
        }
      end

      source_path = File.join(site.source, '/assets/search-data.json')
      
      File.open(source_path, 'w') do |file|
        file.write(JSON.pretty_generate(posts))
      end

      # add generated search-data.json to static files which will be copied to _site 
      static_file = Jekyll::StaticFile.new(site, site.source, '/assets', 'search-data.json')
      existing_file = nil
      site.static_files.each do |static|
        if static.path == static_file.path
            existing_file = static
            break
        end
      end
      if existing_file != nil
        existing_file = static_file
      else
        site.static_files << static_file
      end
    end
  end
end
