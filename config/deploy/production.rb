# frozen_string_literal: true

server '51.68.194.190', :user => 'deploy', :roles => 'app', :primary => true

set :ssh_options, {
    :keys => %w(C:/Users/BGM/.ssh/rva),
    :auth_methods => %w(publickey),
    :forward_agent => true
}
