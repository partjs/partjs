#
# test/features/unsplash.feature
#

Feature: Unsplash feature
  In order to share my enjoys
  As a traveler of photographer
  I want to post photos on website

  Scenario: Post photo
    Given User login
    When Interact with upload element
    Then I should see "my photo"

  Scenario: Slideshow
  	Given The latest photo gallery
  	When Tap to next photo
  	Then I see one photo
  	  And Full page

  Scenario: Photo Slide
    Given Current photo
    When Double click the photo
    Then Photo is full screen


