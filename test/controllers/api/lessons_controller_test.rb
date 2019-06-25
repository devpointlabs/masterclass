require 'test_helper'

class Api::LessonsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_lessons_index_url
    assert_response :success
  end

  test "should get show" do
    get api_lessons_show_url
    assert_response :success
  end

  test "should get create" do
    get api_lessons_create_url
    assert_response :success
  end

  test "should get update" do
    get api_lessons_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_lessons_destroy_url
    assert_response :success
  end

end
