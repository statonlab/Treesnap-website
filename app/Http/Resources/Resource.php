<?php

namespace App\Http\Resources;

use GuzzleHttp\Client;

class Resource
{
    /**
     * The Guzzle client.
     *
     * @var \GuzzleHttp\Client
     */
    protected $client;

    /**
     * Optional base url.
     *
     * @var string
     */
    protected $base_url = '';

    /**
     * Resource constructor.
     */
    public function __construct()
    {
        $this->client = new Client();
    }

    /**
     * Set a base URL.
     *
     * @param $url
     */
    public function setBaseUrl($url)
    {
        $this->base_url = trim($url, '/');
    }

    /**
     * Send a get request.
     *
     * @param $url
     * @param array $parameters
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function get($url, array $parameters = [])
    {
        return $this->client->get($this->prepareURL($url), [
            'query' => $parameters,
        ]);
    }

    /**
     * Perform a post request.
     *
     * @param $url
     * @param array $parameters
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function post($url, array $parameters = [])
    {
        return $this->client->post($this->prepareURL($url), [
            'form_params' => $parameters,
        ]);
    }

    /**
     * Prepare the URL.
     *
     * @param $url
     * @return string
     */
    protected function prepareURL($url)
    {
        if (starts_with($url, 'http://') || starts_with($url, 'https://')) {
            return $url;
        }

        return $this->base_url.'/'.trim($url, '/');
    }
}
