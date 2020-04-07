CURRENT_DIR = $(shell pwd)

.PHONY: build_dockerfile
build_dockerfile:
	docker build -t carta-historia -f Dockerfile .

.PHONY: start
start: build_dockerfile
	docker run -ti --rm --name carta-historia \
		-v $(CURRENT_DIR):/workspace \
		-p 3000:3000 \
		carta-historia \
		start

.PHONY: setup
setup: build_dockerfile
	docker run -ti --rm --name carta-historia \
		-v $(CURRENT_DIR):/workspace \
		carta-historia \
		install
