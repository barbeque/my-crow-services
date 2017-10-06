require 'sinatra'
require 'json'

get '/caw/:caw_count' do |caw_count|
  content_type :json
  {
    :noises => Array.new(caw_count.to_i, 'caw')
  }.to_json
end
