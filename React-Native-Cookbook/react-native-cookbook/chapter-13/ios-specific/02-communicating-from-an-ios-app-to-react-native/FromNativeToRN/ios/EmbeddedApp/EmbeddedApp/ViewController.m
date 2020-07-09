//
//  ViewController.m
//  EmbeddedApp
//
//  Created by Daniel Ward on 9/23/18.
//  Copyright © 2018 Daniel Ward. All rights reserved.
//

#import "ViewController.h"
#import "EmbeddedViewController.h"
#import <React/RCTRootView.h>
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>

@interface ViewController () <RCTBridgeDelegate> {
    EmbeddedViewController *embeddedViewController;
    RCTBridge *_bridge;
    BOOL isRNRunning;
}

@property (weak, nonatomic) IBOutlet UITextField *userNameField;

@end

@implementation ViewController

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
    NSURL *jsCodeLocation = [NSURL
                             URLWithString:@"http://localhost:8081/index.bundle?platform=ios"];
    return jsCodeLocation;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (IBAction)openRNAppEmbeddedButtonPressed:(id)sender {
    NSString *userName = _userNameField.text;
    NSDictionary *props = @{@"userName" : userName};
    
    if(_bridge == nil) {
        _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
    }
    
    RCTRootView *rootView =
    [[RCTRootView alloc] initWithBridge :_bridge
                             moduleName : @"FromNativeToRN"
                      initialProperties : props];
    
    isRNRunning = true;
    [embeddedViewController setView:rootView];
}

- (IBAction)onUserNameChanged:(id)sender {
    if(isRNRunning == YES && _userNameField.text.length > 3) {
        [_bridge.eventDispatcher sendAppEventWithName:@"UserNameChanged" body:@{@"userName" : _userNameField.text}];
    }
}

- (void) prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
    if([segue.identifier isEqualToString:@"embed"]) {
        embeddedViewController = segue.destinationViewController;
    }
}
@end
