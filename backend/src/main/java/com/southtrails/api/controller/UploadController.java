package com.southtrails.api.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/uploads")
public class UploadController {

    private static final Set<String> ALLOWED_TYPES = Set.of("image/jpeg", "image/png", "image/webp", "image/avif");
    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024;

    @PostMapping("/packages")
    ResponseEntity<?> uploadPackageImages(@RequestParam("files") List<MultipartFile> files) throws IOException {
        if (files == null || files.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "At least one image is required."));
        }
        if (files.size() > 5) {
            return ResponseEntity.badRequest().body(Map.of("message", "Upload up to 5 images at a time."));
        }

        Path uploadDir = Paths.get("uploads", "packages").toAbsolutePath().normalize();
        Files.createDirectories(uploadDir);

        List<String> urls = files.stream()
                .map(file -> store(file, uploadDir))
                .toList();

        return ResponseEntity.ok(Map.of("urls", urls));
    }

    private String store(MultipartFile file, Path uploadDir) {
        String rawContentType = file.getContentType();
        String contentType = rawContentType == null ? "" : rawContentType.toLowerCase(Locale.ROOT);
        if (!ALLOWED_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("Only JPG, PNG, WebP, and AVIF images are allowed.");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("Each image must be 5MB or smaller.");
        }

        String extension = switch (contentType) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            case "image/avif" -> ".avif";
            default -> ".jpg";
        };
        String filename = UUID.randomUUID() + extension;

        try {
            file.transferTo(uploadDir.resolve(filename));
            return "/uploads/packages/" + filename;
        } catch (IOException error) {
            throw new IllegalStateException("Unable to store image.", error);
        }
    }

    @ExceptionHandler({IllegalArgumentException.class, IllegalStateException.class})
    ResponseEntity<Map<String, String>> handleUploadError(RuntimeException error) {
        return ResponseEntity.badRequest().body(Map.of("message", error.getMessage()));
    }
}
