package ru.upt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.File;

@Data
@AllArgsConstructor
public class DocumentGenerationResult {
    private String fileName;
    private File tmpFile;
}
