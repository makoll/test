
package com.phonegap.exampleapp;

import android.os.Bundle;

import com.phonegap.DroidGap;

public class exampleapp extends DroidGap {

  @Override
  public void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);
    super.loadUrl("file:///android_asset/www/index.html");
  }
}

