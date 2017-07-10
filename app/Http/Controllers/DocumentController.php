<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Traits\Responds;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    use Responds;

    /**
     * Show the about page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function about()
    {
        return $this->success(Storage::get("docs/aboutUs.md"));
    }

    /**
     * Show the policy page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function policy()
    {
        $contents = Storage::get("docs/PrivacyPolicy.md");

        return $this->success($contents);
    }

    /**
     * Show terms and licenses page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function terms()
    {
        $contents = Storage::get('docs/TermsLicense.md');

        return $this->success($contents);
    }

    /**
     * Show frequently asked questions FAQ page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function faq()
    {
        $contents = Storage::get('docs/FAQ.md');

        return $this->success($contents);
    }

    /**
     * Show Trees page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function trees()
    {
        $contents = Storage::get('docs/Trees.md');

        return $this->success($contents);
    }

    /**
     * Show Partners page.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function partners()
    {
        $contents = Storage::get('docs/Partners.md');

        return $this->success($contents);
    }
}