require 'rack/request'
require 'rack/response'

module Travis
  module Web
    class SetToken
      attr_accessor :app, :template

      def initialize(app)
        @app, @template = app, File.read(__FILE__).split('__END__').last
      end

      def call(env)
        set_info(env) || app.call(env)
      end

      def set_info(env)
        return unless env['REQUEST_METHOD'] == 'POST'
        request = Rack::Request.new(env)
        puts '!!---!!'
        puts request.params
        token, user, storage = request.params.values_at('token', 'user', 'storage')
        if token =~ /\A[a-zA-Z\-_\d]+\Z/
          storage = 'sessionStorage' if storage != 'localStorage'
          # puts 'xx-xx'
          # puts svg_token
          puts '-uu-----------'
          puts JSON.parse(user)['svg_token']
          svg_token = JSON.parse(user)['svg_token']
          info = [storage, token, svg_token, user, request.fullpath]
          # puts '---'
          # puts template % info
          # puts '---'
          Rack::Response.new(template % info).finish
        end
      end
    end
  end
end

__END__
<script>
var storage = %s;
storage.setItem('travis.token', %p);
storage.setItem('travis.svg_token', %p);
storage.setItem('travis.user',  %p);
storage.setItem('travis.become', true);
window.location = %p;
</script>
