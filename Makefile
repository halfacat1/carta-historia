CURRENT_DIR = $(shell pwd)

build_for_dev:
	docker build -t carta-historia-dev -f dev.Dockerfile .

start: build_for_dev
	docker run --name carta-historia-dev -ti -p 3100:3100 --rm \
		-v $(CURRENT_DIR):/workspace \
		carta-historia-dev

.PHONY: build_for_dev start
