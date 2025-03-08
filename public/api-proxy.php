<?php
// This file proxies API requests to your Node.js server if you're running it elsewhere
// Adjust the URL to point to your Node.js server
$nodeServerUrl = 'http://localhost:3000';

// Get the requested API path
$requestUri = $_SERVER['REQUEST_URI'];
$apiPath = str_replace('/api-proxy.php', '', $requestUri);

// Forward the request to the Node.js server
$ch = curl_init($nodeServerUrl . $apiPath);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, true);

// Forward the request method
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $_SERVER['REQUEST_METHOD']);

// Forward the request body
if ($_SERVER['REQUEST_METHOD'] === 'POST' || $_SERVER['REQUEST_METHOD'] === 'PUT') {
    $requestBody = file_get_contents('php://input');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $requestBody);
}

// Forward the request headers
$headers = [];
foreach (getallheaders() as $name => $value) {
    if ($name !== 'Host') {
        $headers[] = "$name: $value";
    }
}
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// Execute the request
$response = curl_exec($ch);
$headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Extract headers and body
$responseHeaders = substr($response, 0, $headerSize);
$responseBody = substr($response, $headerSize);

// Set the status code
http_response_code($httpCode);

// Forward the response headers
foreach (explode("\r\n", $responseHeaders) as $header) {
    if (!empty($header) && strpos($header, ':') !== false) {
        header($header);
    }
}

// Output the response body
echo $responseBody; 