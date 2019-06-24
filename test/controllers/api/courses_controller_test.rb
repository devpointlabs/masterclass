require 'test_helper'

class Api::CoursesControllerTest < ActionDispatch::IntegrationTest
  test "should get file" do
    get api_courses_file_url
    assert_response :success
  end

  test "should get index" do
    get api_courses_index_url
    assert_response :success
  end

  test "should get show" do
    get api_courses_show_url
    assert_response :success
  end

  test "should get create" do
    get api_courses_create_url
    assert_response :success
  end

  test "should get update" do
    get api_courses_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_courses_destroy_url
    assert_response :success
  end

end
