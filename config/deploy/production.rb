# frozen_string_literal: true

server 'server01.rva.lat', :user => 'deploy', :roles => 'app', :primary => true

set :ssh_options, {
    :keys => %w(C:/Users/BGM/.ssh/rva),
    :auth_methods => %w(publickey),
    :forward_agent => true
}
