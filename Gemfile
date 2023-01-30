# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.3'

gem 'jekyll', '~> 4.0.0'                                          # Jekyll, the static site generator
gem 'jekyll-multiple-languages-plugin', '~> 1.7'                  # Jekyll i18n plugin
gem 'jekyll-sitemap', '~> 1.4'                                    # Jekyll site map plugin
gem 'jemoji', '~> 0.12.0'                                         # Jekyll emoji plugin

group :development do
  gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'                           # Resolve OpenSSH problems with capistrano
  gem 'capistrano', '~> 3.14', :require => false                  # Deployment
  gem 'capistrano-bundler', '~> 2.0', :require => false           # Capistrano bundler integration
  gem 'ed25519', '>= 1.2', '< 2.0'                                # Resolve OpenSSH problems with capistrano
  gem 'rubocop', :require => false                                # Ruby code style checker
  gem 'rvm1-capistrano3', :require => false                       # Capistrano rvm integration
end
