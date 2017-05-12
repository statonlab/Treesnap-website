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
    public function terms() {
        $contents = Storage::get('docs/TermsLicense.md');

        return $this->success($contents);
    }
}
