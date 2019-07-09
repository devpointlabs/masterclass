require 'test_helper'

class Api::RepliesControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_replies_index_url
    assert_response :success
  end

  test "should get show" do
    get api_replies_show_url
    assert_response :success
  end

  test "should get create" do
    get api_replies_create_url
    assert_response :success
  end

  test "should get update" do
    get api_replies_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_replies_destroy_url
    assert_response :success
  end

end
