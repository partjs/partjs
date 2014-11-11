all: all_steps

unsplash:
	cucumber.js test/features/unsplash.feature \
		--require test/features/step_definitions/sharedSteps.js

all_steps:
	cucumber.js test/features \
		--require test/features/step_definitions

.PHONY: unsplash all_steps
